import React, { useState, useEffect } from 'react';
import { SmartDropdownContainer, SmartDropDownHeader } from './UI';
import { DropdownItem } from '../../interfaces/DropdownItem';
import './styles.css';
import useDebounce from '../../utilities/useDebounce';

export interface Props {
  title: String;
  items?: DropdownItem[];
  isAdmin?: boolean;
  noOfItems?: number;
  debounceInterval?: number;
  selectedEvent: Function;
  itemAdd?: Function;
  dropDownClass?:string
}

const SmartDropDown = ({
  title,
  items = [],
  noOfItems = 5,
  isAdmin = false,
  debounceInterval = 1000,
  selectedEvent,
  itemAdd = () => {},
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropdownItem[]>([]);
  const [totalNoOfItems, setTotalNoOfItems] = useState(noOfItems);
  const [filteredResults, setFilteredResults] = useState(items);
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, debounceInterval);

  const toggleState = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
    if (!isOpen) {
      //revert to original
      setFilteredResults(items);
    }
  };

  const handleOnClick = (item: DropdownItem) => {
    setSelectedValue([item]);
    selectedEvent(item.value); //Single selected
  };
  const handleAllowMore = () => setTotalNoOfItems(totalNoOfItems + noOfItems);

  const addAndSelect = () => {
    itemAdd(query);
    setQuery('');
    toggleState(isDropdownOpen);
    handleOnClick(items[0]);
  };

  const isItemInSelection = (item: DropdownItem): boolean => {
    if (selectedValue.some((current) => current.id === item.id)) {
      return true;
    } else {
      return false;
    }
  };

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    const updatedResults = async () => {
      if (debouncedSearchTerm) {
        setFilteredResults((filteredResults) => {
          return filteredResults.filter((item: DropdownItem) =>
            item.text.toLowerCase().includes(query.toLowerCase()),
          );
        });
      }
      if (debouncedSearchTerm.length === 0) {
        setFilteredResults(items);
      }
    };
    updatedResults();
  }, [query, debouncedSearchTerm, items]);

  return (
    <SmartDropdownContainer>
      <SmartDropDownHeader
        role="button"
        onKeyPress={() => toggleState(!isDropdownOpen)}
        onClick={() => toggleState(!isDropdownOpen)}
      >
        <div>
          <p>{title}</p>
        </div>
        <div>
          <p className="sd-header__title--bold">{isDropdownOpen ? 'Close' : 'Open'}</p>
        </div>
      </SmartDropDownHeader>
      {isDropdownOpen && (
        <>
          <div className="search-wrapper">
            <input
              type="text"
              id="myInput"
              className="search"
              placeholder="Search..."
              title="Type in a name"
              onChange={search}
            />
          </div>
          <ul className="sd__list">
            {filteredResults.slice(0, totalNoOfItems).map((item: DropdownItem) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() => {
                    handleOnClick(item);
                  }}
                >
                  <span>{item.text}</span>
                  <span>{isItemInSelection(item) && 'Selected'}</span>
                </button>
              </li>
            ))}
              {isAdmin && query.length > 0 && filteredResults.length === 0 && (
            <li key={query.toLowerCase()}>
              <button type="button" className="left">
                <span>{query} Not Found ...</span>
              </button>
              <button onClick={() => addAndSelect()} className="right">
                <span>Add & Select</span>
              </button>
            </li>
          )}
          </ul>
          {filteredResults.length > totalNoOfItems && (
            <div className="moreOptionLink" onClick={() => handleAllowMore()}>
              {noOfItems} More
            </div>
          )}
        
        </>
      )}
    </SmartDropdownContainer>
  );
};

export default SmartDropDown;
