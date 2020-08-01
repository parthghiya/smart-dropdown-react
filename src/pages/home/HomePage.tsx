import React, { useState } from 'react';
import { HomePageContainer } from './UI';
import SmartDropDown from '../../components/dropdown';
import { DropdownItem } from '../../interfaces/DropdownItem';
import { countriesJSON } from '../../__mocks__/mocks';

const HomePage = () => {
  
  const [items, setItems] = useState<DropdownItem[]>(countriesJSON);

  const pickValue: any = (value: string): void => {
    console.log('Value Selected', value);
  };

  const itemReceived=(option:string):void=>{
    //@ts-ignore
    items.unshift({id:Date.now(),text:option,value:option});
    setItems(items);
  }
  
  return (
    <HomePageContainer>
      <SmartDropDown 
            title="Simple Example" 
            items={items} 
            noOfItems={3} 
            selectedEvent={pickValue} 
      />
      <br />
      <br />
      <br />
      <br />
      <SmartDropDown
        title="Admin Example"
        items={items}
        noOfItems={2}
        selectedEvent={pickValue}
        isAdmin
        itemAdd={itemReceived}
      />
    </HomePageContainer>
  );
};

export default HomePage;
