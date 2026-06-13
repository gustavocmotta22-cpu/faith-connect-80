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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      birthday_directory: {
        Row: {
          birth_date: string
          full_name: string
          photo_path: string | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          birth_date: string
          full_name: string
          photo_path?: string | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          birth_date?: string
          full_name?: string
          photo_path?: string | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      church_content: {
        Row: {
          body: string | null
          content_type: string
          created_at: string
          created_by: string
          event_at: string | null
          id: string
          image_path: string | null
          is_published: boolean
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          content_type: string
          created_at?: string
          created_by: string
          event_at?: string | null
          id?: string
          image_path?: string | null
          is_published?: boolean
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          content_type?: string
          created_at?: string
          created_by?: string
          event_at?: string | null
          id?: string
          image_path?: string | null
          is_published?: boolean
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      devotionals: {
        Row: {
          application: string
          author: string | null
          bible_version: string
          created_at: string
          created_by: string | null
          devotional_date: string
          id: string
          prayer: string | null
          reflection: string
          source: string
          title: string
          updated_at: string
          verse_reference: string
          verse_text: string
        }
        Insert: {
          application: string
          author?: string | null
          bible_version?: string
          created_at?: string
          created_by?: string | null
          devotional_date: string
          id?: string
          prayer?: string | null
          reflection: string
          source?: string
          title: string
          updated_at?: string
          verse_reference: string
          verse_text: string
        }
        Update: {
          application?: string
          author?: string | null
          bible_version?: string
          created_at?: string
          created_by?: string | null
          devotional_date?: string
          id?: string
          prayer?: string | null
          reflection?: string
          source?: string
          title?: string
          updated_at?: string
          verse_reference?: string
          verse_text?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          caption: string
          created_at: string
          id: string
          is_approved: boolean
          photo_path: string
          responsibility_accepted: boolean
          updated_at: string
          uploader_id: string
          uploader_name: string
        }
        Insert: {
          caption: string
          created_at?: string
          id?: string
          is_approved?: boolean
          photo_path: string
          responsibility_accepted?: boolean
          updated_at?: string
          uploader_id: string
          uploader_name: string
        }
        Update: {
          caption?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          photo_path?: string
          responsibility_accepted?: boolean
          updated_at?: string
          uploader_id?: string
          uploader_name?: string
        }
        Relationships: []
      }
      library_items: {
        Row: {
          author: string | null
          created_at: string
          description: string | null
          id: string
          is_free_licensed: boolean
          pdf_path: string
          title: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_free_licensed?: boolean
          pdf_path: string
          title: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_free_licensed?: boolean
          pdf_path?: string
          title?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      prayer_publications: {
        Row: {
          created_at: string
          message: string
          prayer_request_id: string
          requester_name: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          message: string
          prayer_request_id: string
          requester_name?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          message?: string
          prayer_request_id?: string
          requester_name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_publications_prayer_request_id_fkey"
            columns: ["prayer_request_id"]
            isOneToOne: true
            referencedRelation: "prayer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          contact_authorized: boolean
          contact_phone: string | null
          created_at: string
          directed_to: string
          id: string
          is_private: boolean
          message: string
          publication_status: string
          requester_id: string
          requester_name: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          contact_authorized?: boolean
          contact_phone?: string | null
          created_at?: string
          directed_to?: string
          id?: string
          is_private?: boolean
          message: string
          publication_status?: string
          requester_id: string
          requester_name?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          contact_authorized?: boolean
          contact_phone?: string | null
          created_at?: string
          directed_to?: string
          id?: string
          is_private?: boolean
          message?: string
          publication_status?: string
          requester_id?: string
          requester_name?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          church_denomination: string | null
          created_at: string
          full_name: string
          has_religion: boolean | null
          id: string
          membership_status: Database["public"]["Enums"]["membership_status"]
          onboarding_complete: boolean
          person_kind: Database["public"]["Enums"]["person_kind"]
          phone: string | null
          photo_consent: boolean
          photo_path: string | null
          religion: string | null
          updated_at: string
        }
        Insert: {
          birth_date?: string | null
          church_denomination?: string | null
          created_at?: string
          full_name: string
          has_religion?: boolean | null
          id: string
          membership_status?: Database["public"]["Enums"]["membership_status"]
          onboarding_complete?: boolean
          person_kind: Database["public"]["Enums"]["person_kind"]
          phone?: string | null
          photo_consent?: boolean
          photo_path?: string | null
          religion?: string | null
          updated_at?: string
        }
        Update: {
          birth_date?: string | null
          church_denomination?: string | null
          created_at?: string
          full_name?: string
          has_religion?: boolean | null
          id?: string
          membership_status?: Database["public"]["Enums"]["membership_status"]
          onboarding_complete?: boolean
          person_kind?: Database["public"]["Enums"]["person_kind"]
          phone?: string | null
          photo_consent?: boolean
          photo_path?: string | null
          religion?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      society_groups: {
        Row: {
          acronym: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          acronym: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          acronym?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          whatsapp_url?: string | null
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
      [_ in never]: never
    }
    Enums: {
      app_role: "admin"
      membership_status: "pending" | "verified" | "rejected"
      person_kind: "member" | "visitor"
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
      app_role: ["admin"],
      membership_status: ["pending", "verified", "rejected"],
      person_kind: ["member", "visitor"],
    },
  },
} as const
