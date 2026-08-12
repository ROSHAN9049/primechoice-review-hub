// src/lib/admin-users.functions.ts
import { createServerFn } from "@emstrack/react-start";
import { createClient } from "@supabase/supabase-js";
import { parse } from 'csv-parse/sync';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// ----- 1. PRODUCT ADD/UPDATE -----
export const upsertProduct = createServerFn({ method: "POST" })
  .validator((data: any) => {
    if (!data.title) throw new Error("Title is required");
    return data;
  })
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    
    if (!rest.slug) {
      rest.slug = rest.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    }

    if (id) {
      const { error } = await supabase.from('products').update(rest).eq('id', id);
      if (error) throw new Error(error.message);
      return { success: true, message: "Product Updated!" };
    } else {
      const { error } = await supabase.from('products').insert({ ...rest, status: 'draft' });
      if (error) throw new Error(error.message);
      return { success: true, message: "Product Created!" };
    }
  });

// ----- 2. PRODUCT DELETE -----
export const deleteProduct = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase.from('products').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { success: true, message: "Product Deleted!" };
  });

// ----- 3. BULK CSV IMPORT -----
export const importCSV = createServerFn({ method: "POST" })
  .validator((data: { csvText: string }) => {
    if (!data.csvText) throw new Error("CSV data is empty");
    return data;
  })
  .handler(async ({ data }) => {
    const records = parse(data.csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    if (records.length === 0) throw new Error("No records found");

    const productsToInsert = records.map((row: any) => ({
      ...row,
      slug: row.title?.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') || `product-${Date.now()}`,
      status: 'draft',
      is_demo: row.is_demo === 'true' || row.is_demo === 'TRUE' || false,
      price: parseFloat(row.price) || 0
    }));

    const { error } = await supabase.from('products').insert(productsToInsert);
    if (error) throw new Error(error.message);
    
    return { success: true, message: `${records.length} products imported!` };
  });
