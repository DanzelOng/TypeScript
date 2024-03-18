import FullList from '../model/FullList';

interface DOMList {
  ul: HTMLUListElement;
  clear: () => void;
  render: (fullList: FullList) => void;
}

export default class ListTemplate implements DOMList {
  public ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }

  public clear(): void {
    this.ul.innerHTML = '';
  }

  public render(fullList: FullList): void {
    // clear existing ul contents
    this.clear();

    fullList.list.forEach((item) => {
      // create li element
      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'item';

      // create input check box element
      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.id = item.id;
      check.checked = item.checked;

      // add event listener to toggle between check states
      // commit changes back to localstorage
      check.addEventListener('change', () => {
        item.checked = !item.checked;
        fullList.save();
      });

      li.append(check);

      // create label element
      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;

      li.append(label);

      // create button element
      const btn = document.createElement('button') as HTMLButtonElement;
      btn.className = 'button';
      btn.textContent = 'X';

      // add event listener to remove list item
      btn.addEventListener('click', () => {
        fullList.removeItem(item.id);

        // re update DOM
        this.render(fullList);
      });

      li.append(btn);

      // append to ul parent element
      this.ul.append(li);
    });
  }
}
