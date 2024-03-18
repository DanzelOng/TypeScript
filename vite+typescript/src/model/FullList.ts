import ListItem from './ListItem';

interface List {
  readonly list: Array<ListItem>;
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: Array<ListItem> = []) {}

  // return the list collection of ListItem objects
  public get list(): ListItem[] {
    return this._list;
  }

  // load List items from LocalStorage
  public load(): void {
    const storedList: string | null = localStorage.getItem('myList');

    if (typeof storedList !== 'string') {
      this.save();
      return;
    }

    const parsedList: Array<{ _id: string; _item: string; _checked: boolean }> =
      JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      // create a new list item
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );

      // add list item to list
      FullList.instance.addItem(newListItem);
    });
  }

  // save changes to LocalStorage
  public save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list));
  }

  // clear contents of the list
  public clearList(): void {
    this._list = [];
    this.save();
  }

  // add a ListItem object
  public addItem(itemObj: ListItem): void {
    this._list.push(itemObj);

    // save changes to LocalStorage
    this.save();
  }

  // remove a ListItem object
  public removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
