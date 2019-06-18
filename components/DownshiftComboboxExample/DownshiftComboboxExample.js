// You'll find that downshift is a primitive component and
// you'll be most successful wrapping it with another component
// like the MultiDownshift one you see here:

import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
//import {Menu, ControllerButton, Item, ArrowIcon, css, getItems} from '../shared';

const Menu = styled.div``;
const ControllerButton = styled.button``;
const Item = styled.li``;
const ArrowIcon = styled.span``;
function css() {}
function getItems() {}


class MultiDownshift extends React.Component {
  state = {selectedItems: []}

  /**
   * When the enter key is pressed or an item is clicked, return a new state with the highlighedIndex
   * from the current state, the isOpen property set to true, and the inputValue set to an empty string. 
   * For any other actions just return the new state with no interference.
   */
  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  /**
   * Firstly this method defines a callOnChange function. When ran, callOnChange will call onSelect and 
   * onChange functions if they were passed as props to this component (<MultiDownshift) - if there weren't
   * onSelect and/or onChange props supplied then call on change ultimately does nothing. 
   * 
   * Secondly, this method checks whether the selected item (passed in as the selectedItem argument) 
   * exists in the selectedItems array in state. If it does then the item has been selected in order
   * to be removed, so we call the removeItem method, supplying the selected item and the callOnChange
   * function we defined is passed as the callback. If the selected item wasn't in the selectedItems
   * array, then we call addSelectedItem, passing it the selected item, and out callOnChange function
   * as the callback function. 
   */
  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const {onSelect, onChange} = this.props
      const {selectedItems} = this.state
      if (onSelect) {
        onSelect(selectedItems, this.getStateAndHelpers(downshift))
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift))
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  /**
   * Takes an item and a callback, then updates selectedItems state by removing the given item
   * and calls the callback once state has updated.
   */
  removeItem = (item, cb) => {
    this.setState(({selectedItems}) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      }
    }, cb)
  }

  /**
   * Takes an item and a callback, then updated selectedItems state by adding the given item
   * and calls the callback once state has updated.
   */
  addSelectedItem(item, cb) {
    this.setState(
      ({selectedItems}) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  /**
   * Creates an object that contains the props for a remove button. The object contains an onClick 
   * function, which will call the onClick function that you passed to this method (getRemoveButtonProps)
   * if you passed one, and will call the removeItem method on this class to remove the item from selectedItems
   * state. It will also pass along any additional props you supply to this method.
   */
  getRemoveButtonProps = ({onClick, item, ...props} = {}) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.removeItem(item)
      },
      ...props,
    }
  }

  /**
   * Creates and returns an object with state and helpers. Specifically it exposes the selectedItems state,
   * the getRemoveButtonProps and removeItem methods from this class, and also passes through all of the 
   * state and utilities that downshift already passes through to its function child (they are supplied to this
   * method as the downshift argument and just passed through as-is).
   */
  getStateAndHelpers(downshift) {
    const {selectedItems} = this.state
    const {getRemoveButtonProps, removeItem} = this
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift,
    }
  }

  /**
   * Renders a DownShift instance, with any optional props that you have supplied applied to the 
   * <Downshift> component. The way the function child is called here is a little complicated, the 
   * end result is that the function child of THIS component (MultiDownshift) becomes the function
   * child for the <Downshift> component in this render method, and it gets passed not only the state
   * and utilites that downshift provides, but also a couple of extra ones from this component (the ones
   * added by the getStateAndHelpers method).
   */
  render() {
    const {render, children = render, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={null}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}

/*

    Notes on logic in function child:

    On the container <div> we have an onClick that calls toggleMenu() to either open or close the menu
    (the dropdown). If it opens the menu it also focuses the input. 

    If selectedItems (the array of currently selected items passed down from MutliDownshift) has length 
    then it renders a `tag` for each item in that array. The tag includes the name (value) of the item, 
    and it also includes a button that when click will remove that item from the list. It achieves this
    by using the props passed to it via the getRemoveButtonProps function. This function is passed down
    from Multidownshift, and is akin to the prop getters in the regular downshift library. 

    The input element gets its props via the getInputProps prop getter supplied by downshift, but we
    add some extra stuff. We add our own ref for the element (I believe downshift uses this internally as
    well) and we add our own onKeyDown function (the one we add handles backspaces, however downshift still
    calls its own onKeyDown function in addition to ours, that way we don't have to specify every interaction).
    
    We render a button to toggle the menu open and closed, called <ControllerButton> here, and it just uses the 
    props provided by downshifts getToggleButtonProps prop getter to achieve its functionality. 

    We render a menu, using downshifts getMenuProps prop getter. When the menu is open we map over our items 
    and render a menu item for each one. We get the props with downshifts getItemProps prop getter.


*/

class App extends React.Component {
  input = React.createRef()
  itemToString = item => (item ? item.name : '')
  handleChange = selectedItems => {
    console.log({selectedItems})
  }
  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
      >
        <h1 {...css({textAlign: 'center'})}>Multi-selection example</h1>
        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}
        >
          {({
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            // note that the getRemoveButtonProps prop getter and the removeItem
            // action are coming from MultiDownshift composibility for the win!
            getRemoveButtonProps,
            removeItem,

            isOpen,
            inputValue,
            selectedItems,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{width: 500, margin: 'auto', position: 'relative'}}>
              <div
                {...css({
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: '6px',
                  borderTopRadius: 6,
                  borderBottomRightRadius: isOpen ? 0 : 6,
                  borderBottomLeftRadius: isOpen ? 0 : 6,
                  padding: 10,
                  paddingRight: 50,
                  boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
                  borderColor: '#96c8da',
                  borderTopWidth: '1',
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderStyle: 'solid',
                })}
                onClick={() => {
                  toggleMenu()
                  !isOpen && this.input.current.focus()
                }}
              >
                <div
                  {...css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  })}
                >
                  {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <div
                          key={item.id}
                          {...css({
                            margin: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 8,
                            paddingRight: 8,
                            display: 'inline-block',
                            wordWrap: 'none',
                            backgroundColor: '#ccc',
                            borderRadius: 2,
                          })}
                        >
                          <div
                            {...css({
                              display: 'grid',
                              gridGap: 6,
                              gridAutoFlow: 'column',
                              alignItems: 'center',
                            })}
                          >
                            <span>{item.name}</span>
                            <button
                              {...getRemoveButtonProps({item})}
                              {...css({
                                cursor: 'pointer',
                                lineHeight: 0.8,
                                border: 'none',
                                backgroundColor: 'transparent',
                                padding: '0',
                                fontSize: '16px',
                              })}
                            >
                              𝘅
                            </button>
                          </div>
                        </div>
                      ))
                    : 'Select a value'}
                  <input
                    {...getInputProps({
                      ref: this.input,
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                      ...css({
                        border: 'none',
                        marginLeft: 6,
                        flex: 1,
                        fontSize: 14,
                        minHeight: 27,
                      }),
                    })}
                  />
                </div>
                <ControllerButton
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              </div>
              <Menu {...getMenuProps({isOpen})}>
                {isOpen
                  ? getItems(inputValue).map((item, index) => (
                      <Item
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItems.includes(item),
                        })}
                      >
                        {item.name}
                      </Item>
                    ))
                  : null}
              </Menu>
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}

export default App
