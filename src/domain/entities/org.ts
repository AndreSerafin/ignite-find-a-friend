import { Entity } from '@/core/entity'

interface OrgProps {
  id: string
  name: string
  address: string
  phone: string
}

export class Org extends Entity<OrgProps> {}
