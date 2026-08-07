export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      affiliate_networks: {
        Row: {
          affiliate_id: string
          country: string
          created_at: string
          enabled: boolean
          id: string
          key: string
          link_template: string
          name: string
          region: string
          tracking_id: string
          updated_at: string
          utm: Json
        }
        Insert: {
          affiliate_id?: string
          country?: string
          created_at?: string
          enabled?: boolean
          id?: string
          key: string
          link_template?: string
          name: string
          region?: string
          tracking_id?: string
          updated_at?: string
          utm?: Json
        }
        Update: {
          affiliate_id?: string
          country?: string
          created_at?: string
          enabled?: boolean
          id?: string
          key?: string
          link_template?: string
          name?: string
          region?: string
          tracking_id?: string
          updated_at?: string
          utm?: Json
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: number
          meta: Json
          network: string | null
          path: string
          ref_slug: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: number
          meta?: Json
          network?: string | null
          path?: string
          ref_slug?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: number
          meta?: Json
          network?: string | null
          path?: string
          ref_slug?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: Json
          author_id: string | null
          category: string
          created_at: string
          excerpt: string
          id: string
          image: string
          publish_date: string
          reading_time: number
          sections: Json
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author?: Json
          author_id?: string | null
          category: string
          created_at?: string
          excerpt?: string
          id?: string
          image?: string
          publish_date?: string
          reading_time?: number
          sections?: Json
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author?: Json
          author_id?: string | null
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          image?: string
          publish_date?: string
          reading_time?: number
          sections?: Json
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          description: string
          id: string
          logo_url: string | null
          name: string
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          region: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name: string
          region?: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          region?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      comparisons: {
        Row: {
          author_id: string | null
          category: string
          created_at: string
          excerpt: string
          id: string
          payload: Json
          publish_date: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          payload?: Json
          publish_date?: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          payload?: Json
          publish_date?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          active: boolean
          coupon_code: string | null
          created_at: string
          detail: string
          discount: string | null
          expiry_date: string | null
          id: string
          network: string | null
          target_slug: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          active?: boolean
          coupon_code?: string | null
          created_at?: string
          detail?: string
          discount?: string | null
          expiry_date?: string | null
          id?: string
          network?: string | null
          target_slug?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          active?: boolean
          coupon_code?: string | null
          created_at?: string
          detail?: string
          discount?: string | null
          expiry_date?: string | null
          id?: string
          network?: string | null
          target_slug?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      guides: {
        Row: {
          author_id: string | null
          category: string
          created_at: string
          excerpt: string
          id: string
          payload: Json
          publish_date: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          payload?: Json
          publish_date?: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          created_at?: string
          excerpt?: string
          id?: string
          payload?: Json
          publish_date?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string
          status?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_links: Json
          brand: string | null
          category: string | null
          cons: Json
          created_at: string
          currency: string
          description: string
          id: string
          images: Json
          price: number | null
          pros: Json
          rating: number
          region: string
          seo: Json
          slug: string
          specifications: Json
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          affiliate_links?: Json
          brand?: string | null
          category?: string | null
          cons?: Json
          created_at?: string
          currency?: string
          description?: string
          id?: string
          images?: Json
          price?: number | null
          pros?: Json
          rating?: number
          region?: string
          seo?: Json
          slug: string
          specifications?: Json
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          affiliate_links?: Json
          brand?: string | null
          category?: string | null
          cons?: Json
          created_at?: string
          currency?: string
          description?: string
          id?: string
          images?: Json
          price?: number | null
          pros?: Json
          rating?: number
          region?: string
          seo?: Json
          slug?: string
          specifications?: Json
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          affiliate_product_id: string | null
          author_id: string | null
          category: string
          content: Json
          created_at: string
          excerpt: string
          featured: boolean
          id: string
          image: string
          product: string
          product_ref: string | null
          publish_date: string
          rating: number
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          vendor: string
        }
        Insert: {
          affiliate_product_id?: string | null
          author_id?: string | null
          category: string
          content?: Json
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          image?: string
          product: string
          product_ref?: string | null
          publish_date?: string
          rating?: number
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          vendor?: string
        }
        Update: {
          affiliate_product_id?: string | null
          author_id?: string | null
          category?: string
          content?: Json
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          image?: string
          product?: string
          product_ref?: string | null
          publish_date?: string
          rating?: number
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          vendor?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_ref_fkey"
            columns: ["product_ref"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_write: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "author" | "subscriber"
      content_status: "draft" | "pending" | "published" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "author", "subscriber"],
      content_status: ["draft", "pending", "published", "archived"],
    },
  },
} as const
