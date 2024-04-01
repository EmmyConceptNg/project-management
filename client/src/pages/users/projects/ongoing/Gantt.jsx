

import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

export const GanttChartComponent = ({tasks}) => {

  // Define any other component state and functionality here

  return (
    <Gantt
      tasks={tasks}
      viewMode={'Day'}
      // ...other props you might need to pass
    />
  );
}

export default GanttChartComponent;