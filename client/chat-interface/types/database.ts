export interface User {
  id: number
  username: string
  email: string
  created_at: Date
}

export interface Channel {
  id: number
  name: string
  description: string | null
  created_at: Date
}

export interface Message {
  id: number
  user_id: number
  channel_id: number | null
  recipient_id: number | null
  content: string
  sent_at: Date
}

export interface ChannelMembership {
  id: number
  user_id: number
  channel_id: number
  joined_at: Date
}

export interface UserSession {
  id: number
  user_id: number
  session_token: string
  created_at: Date
  expires_at: Date
}

export interface UserRole {
  id: number
  user_id: number
  role: string
  assigned_at: Date
}

export interface File {
  id: number
  user_id: number
  channel_id: number | null
  file_name: string
  file_path: string
  uploaded_at: Date
}

export interface UserStatus {
  id: number
  user_id: number
  status: string
  last_active: Date
}

