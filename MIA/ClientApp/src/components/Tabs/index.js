import React, { Component } from "react";
import classNames from "classnames";

const TabList = ({ children, activeIndex, handleActiveTab, activeClassName, ...props }) => {
  const TabList = React.Children.map(children, (childElement, index) =>
    React.cloneElement(childElement, {
      isActive: activeIndex === index,
      onActive: () => handleActiveTab(index),
      activeClassName: activeClassName,
      ...props
    })
  );
  return TabList;
};

const Tab = ({ isActive, onActive, activeClassName, tabClassName, children, ...props }) => {
  const styles = classNames(tabClassName, { [activeClassName]: isActive });
  return React.cloneElement(children, {
    className: styles,
    onClick: () => onActive && onActive(),
    ...props
  });
};

const TabPanels = ({ activeIndex, ...props }) => <div {...props}> {props.children[activeIndex]} </div>;

const TabPane = ({ children, ...props }) => <div {...props}> {children} </div>;

class Tabs extends Component {
  state = { activeTab: 0 };

  handleTabClick = index => this.setState({ activeTab: index });

  render() {
    const { activeTab } = this.state;
    const { children } = this.props;

    const items = React.Children.map(children, (childElement, index) => {
      if (childElement.props.name === "TabList") {
        return React.cloneElement(childElement, {
          activeIndex: activeTab,
          handleActiveTab: index => this.handleTabClick(index)
        });
      } else if (childElement.props.name === "TabPanels") {
        const clone = React.cloneElement(childElement, {
          activeIndex: activeTab
        });
        return clone;
      } else {
        return childElement;
      }
    });

    return <div> {items} </div>;
  }
}

export { TabList, Tab, TabPanels, TabPane };
export default Tabs;
