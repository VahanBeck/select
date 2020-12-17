import React, {useState, useCallback, useEffect} from "react";
import "./select.css";

export const Select = ({data, selectedValues, value = "value", label = "label"}) => {

  const [isListOpen, toggleList] = useState(false);

  const [optionsList, setOptionsList] = useState(data);

  const [selectedItems, setSelectedItems] = useState(selectedValues || []);

  const addSelectedItem = useCallback((value) => {
    setSelectedItems(prevState => Array.from(new Set([
      ...prevState,
      value
    ])))
  }, []);

  const removeSelectedItem = useCallback((value) => {
    setSelectedItems(prevState => prevState.filter(item => item !== value))
  }, []);

  const handleChange = useCallback((event) => {
    setOptionsList(data.filter(item => item[label].toLowerCase().includes(event.target.value.toLowerCase())));
  }, [data, label]);

  const handleDisplayOptionsListChange = useCallback(() => {
    toggleList(prevState => !prevState);
    setOptionsList(data);
  }, [data]);

  return (
    <div className="select-container">
      <div className={`select-wrapper ${isListOpen ? "opened" : ""}`} onClick={handleDisplayOptionsListChange}>
        {
          selectedItems.length ?
            selectedItems.map(item =>
              <span
                className="selected-item"
                key={item}>
                {item}
                <i
                  onClick={(event) => {
                    event.stopPropagation();
                    removeSelectedItem(item)
                  }}
                  className="remove-selected-item">
                  x
                </i>
              </span>
            )
            :
            <span className="placeholder">
              Select an item
            </span>
        }
      </div>
      {
        isListOpen ?
          <ul className="select-content-ul">
            <li className="search-field-container">
              <input
                type="text"
                placeholder="Search for an item"
                onChange={handleChange}/>
            </li>
            {
              optionsList.map(
                item => <li
                  key={item[value]}
                  className={`select-item ${selectedItems.includes(item[value]) ? "disabled" : ""}`}
                  onClick={() => addSelectedItem(item[value])}
                >
                  {item[label]}
                </li>
              )
            }
          </ul>
          :
          null
      }
    </div>
  )
}
