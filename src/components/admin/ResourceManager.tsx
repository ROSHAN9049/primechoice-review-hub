import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Download, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "json" | "date";

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  options?: readonly string[];
  placeholder?: string;
  /** Shown in the list table. */
  list?: boolean;
  required?: boolean;
  help?: string;
  default?: unknown;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

interface Props {
  /** Supabase table name. */
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  /** Column used for the human-readable label + search. */
  labelField?: string;
  orderBy?: { column: string; ascending?: boolean };
  /** Columns injected on insert (e.g. author_id). */
  withDefaults?: () => Row;
}

const emptyFor = (fields: FieldDef[]): Row =>
  Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.default !== undefined
        ? f.default
        : f.type === "boolean"
          ? false
          : f.type === "number"
            ? 0
            : f.type === "json"
              ? ""
              : "",
    ]),
  );

function coerce(fields: FieldDef[], form: Row): Row {
  const out: Row = {};
  for (const f of fields) {
    const v = form[f.name];
    if (f.type === "number") out[f.name] = v === "" || v === null ? null : Number(v);
    else if (f.type === "json") {
      if (v === "" || v === null || v === undefined) continue;
      out[f.name] = typeof v === "string" ? JSON.parse(v) : v;
    } else if (f.type === "boolean") out[f.name] = Boolean(v);
    else if (v === "" && !f.required) out[f.name] = null;
    else out[f.name] = v;
  }
  return out;
}

function toFormValues(fields: FieldDef[], row: Row): Row {
  const out: Row = {};
  for (const f of fields) {
    const v = row[f.name];
    out[f.name] =
      f.type === "json"
        ? v == null
          ? ""
          : JSON.stringify(v, null, 2)
        : v == null
          ? f.type === "boolean"
            ? false
            : ""
          : v;
  }
  return out;
}

export function ResourceManager({
  table,
  title,
  description,
  fields,
  labelField = "title",
  orderBy = { column: "created_at", ascending: false },
  withDefaults,
}: Props) {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as never)
        .select("*")
        .order(orderBy.column, { ascending: orderBy.ascending ?? false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const save = useMutation({
    mutationFn: async (payload: Row) => {
      const body = coerce(fields, payload);
      if (editing?.["id"]) {
        const { error } = await supabase
          .from(table as never)
          .update(body as never)
          .eq("id", editing["id"]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(table as never)
          .insert({ ...(withDefaults?.() ?? {}), ...body } as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["admin", table] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(table as never)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      void qc.invalidateQueries({ queryKey: ["admin", table] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const listFields = fields.filter((f) => f.list).slice(0, 4);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      JSON.stringify(r).toLowerCase().includes(q),
    );
  }, [rows, query]);

  const openNew = () => {
    setEditing({});
    setForm(emptyFor(fields));
  };
  const openEdit = (row: Row) => {
    setEditing(row);
    setForm(toFormValues(fields, row));
  };
  const duplicate = (row: Row) => {
    const values = toFormValues(fields, row);
    if (values["slug"]) values["slug"] = `${values["slug"]}-copy`;
    if (values[labelField]) values[labelField] = `${values[labelField]} (copy)`;
    setEditing({});
    setForm(values);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${table}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      const items = (Array.isArray(parsed) ? parsed : [parsed]).map((item: Row) => {
        const clean: Row = { ...item };
        delete clean["id"];
        delete clean["created_at"];
        delete clean["updated_at"];
        return clean;
      });
      const { error } = await supabase.from(table as never).insert(items as never);
      if (error) throw error;
      toast.success(`Imported ${items.length} row(s)`);
      void qc.invalidateQueries({ queryKey: ["admin", table] });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker">Manage</p>
          <h1 className="font-display text-2xl font-extrabold">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importJson(f);
              e.target.value = "";
            }}
          />
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" /> Import
          </Button>
          <Button variant="outline" size="sm" onClick={exportJson}>
            <Download className="size-4" /> Export
          </Button>
          <Button size="sm" onClick={openNew}>
            <Plus className="size-4" /> New
          </Button>
        </div>
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter…"
        className="mt-6 max-w-sm"
      />

      <div className="card-surface mt-4 overflow-x-auto rounded-xl">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
            <tr>
              {listFields.map((f) => (
                <th key={f.name} className="px-4 py-3 font-semibold">
                  {f.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={listFields.length + 1}>
                  Loading…
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={listFields.length + 1}>
                  Nothing here yet.
                </td>
              </tr>
            )}
            {filtered.map((row) => (
              <tr key={row["id"]} className="border-b border-border/60 last:border-0">
                {listFields.map((f) => (
                  <td key={f.name} className="max-w-70 truncate px-4 py-3">
                    {typeof row[f.name] === "boolean"
                      ? row[f.name]
                        ? "Yes"
                        : "No"
                      : String(row[f.name] ?? "—")}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => openEdit(row)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Duplicate"
                      onClick={() => duplicate(row)}
                    >
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => {
                        if (confirm("Delete this item?")) remove.mutate(row["id"]);
                      }}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing?.["id"] ? `Edit ${title.toLowerCase()}` : `New ${title.toLowerCase()}`}
            </DialogTitle>
          </DialogHeader>
          <form
            id="resource-form"
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              try {
                save.mutate(form);
              } catch (err) {
                toast.error((err as Error).message);
              }
            }}
          >
            {fields.map((f) => {
              const wide = f.type === "textarea" || f.type === "json";
              return (
                <div key={f.name} className={wide ? "sm:col-span-2" : ""}>
                  <Label htmlFor={`f-${f.name}`}>{f.label}</Label>
                  {f.type === "boolean" ? (
                    <div className="mt-2">
                      <Switch
                        id={`f-${f.name}`}
                        checked={Boolean(form[f.name])}
                        onCheckedChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))}
                      />
                    </div>
                  ) : f.type === "select" ? (
                    <select
                      id={`f-${f.name}`}
                      className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={String(form[f.name] ?? "")}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    >
                      <option value="">—</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : wide ? (
                    <Textarea
                      id={`f-${f.name}`}
                      rows={f.type === "json" ? 8 : 4}
                      className="mt-1.5 font-mono text-xs"
                      value={String(form[f.name] ?? "")}
                      placeholder={f.placeholder ?? ""}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    />
                  ) : (
                    <Input
                      id={`f-${f.name}`}
                      className="mt-1.5"
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      step={f.type === "number" ? "any" : undefined}
                      required={f.required ?? false}
                      value={String(form[f.name] ?? "")}
                      placeholder={f.placeholder ?? ""}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    />
                  )}
                  {f.help && <p className="mt-1 text-xs text-muted-foreground">{f.help}</p>}
                </div>
              );
            })}
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button type="submit" form="resource-form" disabled={save.isPending}>
              {save.isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}