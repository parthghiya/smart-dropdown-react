Smart Dropdown Component 


Demo Usage : 
```
<SmartDropDown 
            title="Simple Example" 
            items={items} 
            noOfItems={3} 
            selectedEvent={pickValue} 
            isAdmin
            itemAdd={itemReceived}
            dropDownClass="my-custom-class"
      />
```


      title - Name of the Dropdown
      items - Items it needs to display
      no Of Items - Max No of items to show per list
      selectedEvent - Call back event which returns which value is selected
      isAdmin - If the User is Admin, he can add new options
      itemAdd - Call back function - which decides what to do: when a new item is added.
      dropDownClass- In Case if we want to add Custom Class


Steps to Run :

Prequisites : NodeJS 14+ or NodeJS 12 or less (No: NodeJS 13)
Run : NPM install
start the project using npm start
