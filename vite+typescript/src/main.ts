import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

// initialize app
const initApp = function (): void {
  // define Singletons
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // get Form element
  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement;

  // add event listener when form submits
  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    // retrive new input element
    const newItemEntryInputEl = document.getElementById(
      'newItem'
    ) as HTMLInputElement;

    const newEntryText: string = newItemEntryInputEl.value.trim();
    console.log(newEntryText);

    if (!newEntryText) return;

    // assign new item id to the Id of the last list item plus 1 if list exists
    // otherwise set the starting Id to 1
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    // create new ListItem object
    const newListItem = new ListItem(itemId.toString(), newEntryText);

    // add ListItem to FullList
    fullList.addItem(newListItem);
    
    // re render template with each update
    template.render(fullList);
  });

  const clearAllItemsBtn = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;

  clearAllItemsBtn.addEventListener('click', (): void => {
    // clear entire list
    fullList.clearList();
    template.clear();
  });

  // load list items from LocalStorage if any
  fullList.load();

  // initial render of template
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
