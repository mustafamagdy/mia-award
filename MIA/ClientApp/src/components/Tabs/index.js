import React, { Component } from "react";
import classNames from "classnames";

const TabList = ({ children, activeIndex, handleActiveTab, handleActiveTabWithKey, activeClassName, activeTabKey, ...props }) => {
  const TabList = React.Children.map(children, (childElement, index) =>
    React.cloneElement(childElement, {
      isActive: activeIndex === index,
      onActive: tabKey => {
        if (activeTabKey != undefined && handleActiveTabWithKey) {
          handleActiveTabWithKey(tabKey);
        } else {
          handleActiveTab(index);
        }
      },
      activeClassName: activeClassName,
      ...props
    })
  );
  return TabList;
};

const Tab = ({ isActive, tabKey, onActive, activeClassName, tabClassName, children, ...props }) => {
  const styles = classNames(tabClassName, { [activeClassName]: isActive });
  return React.cloneElement(children, {
    className: styles,
    onClick: () => onActive && onActive(tabKey),
    ...props
  });
};

const TabPanels = ({ children, activeIndex, activeTabKey, activeClassName, ...props }) => {
  if (activeTabKey != undefined && activeTabKey != "") {
    const child = children.find(a => a["paneKey"] == activeTabKey);
    let element;
    if (child == undefined) element = React.cloneElement(children[activeIndex], { activeClassName, ...props });
    else element = React.cloneElement(child, { activeClassName, ...props });
    return element;
  } else {
    const element = React.cloneElement(children[activeIndex], { activeClassName, ...props });
    return element;
  }
};

const TabPane = ({ children, className, activeClassName, ...props }) => {
  const childClassName = children.props.className;
  const styles = classNames(className, childClassName, `${activeClassName}`);
  return React.cloneElement(children, {
    className: styles,
    ...props
  });
};

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
