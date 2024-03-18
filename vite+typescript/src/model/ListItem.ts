export interface Item {
  readonly id: string;
  readonly item: string;
  readonly checked: boolean;
}

export default class ListItem implements Item {
  constructor(
    // define private instance fields
    private _id: string = '',
    private _item: string = '',
    private _checked: boolean = false
  ) {}

  // define getters and setters for each field
  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get item(): string {
    return this._item;
  }

  public set item(item: string) {
    this._item = item;
  }

  public get checked(): boolean {
    return this._checked;
  }

  public set checked(checked: boolean) {
    this._checked = checked;
  }
}
