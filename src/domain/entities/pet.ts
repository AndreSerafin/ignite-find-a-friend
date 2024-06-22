import { Entity } from '@/core/entity'
import { City } from './city'

interface PetProps {
  name: string
  specie: string
  age: number
  weight: number
  height: number
  breed?: string
  color?: string
  city: City

  createdAt: string
  updatedAt?: string
}

export class Pet extends Entity<PetProps> {}
