import React from 'react';
import { RightTabs } from '../utils/material.util';
import { connect } from 'react-redux';
import { ComponentState, ChildState } from '../types/types';
import * as actions from '../actions/actions';

// ** IPC used with Electron for render
const IPC = require('electron').ipcRenderer;

// ** Right Container props definitions
type Props = {
  focusChild: ChildState;
  components: Array<ComponentState>;
  focusComponent: ComponentState;
  deleteProp: any;
  addProp: any;
}

// ** Redux state mapping to props
const mapStateToProps = (store: any) => ({
  focusChild: store.application.focusChild,
  components: store.application.components,
});

// ** Redux dispatch mapping to props
const mapDispatchToProps = (dispatch: any) => ({
  handleNotificationClose: () => dispatch(actions.handleClose()),
  deleteProp: ({ id, index }: { id: number; index: number }) => dispatch(actions.deleteProp({ id, index })),
  addProp: (prop: any) => dispatch(actions.addProp(prop)),
});

// ** RightContainer is now a functional component since it doesn't track state internally nor have any need for specific class methods
const RightContainer: React.FC<Props> = (props) => {
  const { components, focusComponent, deleteProp, addProp, focusChild } = props;
  return (
    <div className="column right-container">
      <RightTabs
        components={components}
        focusComponent={focusComponent}
        deleteProp={deleteProp}
        addProp={addProp}
        focusChild={focusChild}
      />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RightContainer);
