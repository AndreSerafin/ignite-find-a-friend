import { Entity } from '@/core/entity'

interface CityProps {
  id: string
  name: string
  state: string
}

export class City extends Entity<CityProps> {}
