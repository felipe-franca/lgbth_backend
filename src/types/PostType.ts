
export interface CreatePostType {
  banner: string
  category: string
  description: string
  resume: string
  short_description: string
  type: string
  title: string
};

export interface NormalizedPost {
  id: number
  banner: string
  title: string
  resume: string
  description: string
  type: string
  category: string
  url: string
  createdAt: string
  shortDescription: string | null
}
