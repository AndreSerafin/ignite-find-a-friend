import { randomUUID } from 'crypto'

export class Entity<Props> {
  private _id: string
  protected props: Props

  protected constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}
