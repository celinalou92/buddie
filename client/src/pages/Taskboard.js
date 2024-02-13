import React, {useState, useEffect} from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useLazyQuery } from '@apollo/client';
import { QUERY_TASKS } from '../utils/queries';
import Container from '@material-ui/core/Container';
import AuthService from '../utils/auth';

const Taskboard = () => {
  // -------------------------- Set State ------------------------- //

  // set state to use later in useEffect to tell it to rerender
  const [shouldUpdate, setShouldUpdate] = useState(false)
  // query for tasks
  const[getAllTasks, { loading, data}] = useLazyQuery(
    QUERY_TASKS,
    // skip cached data because its annoying 
    {fetchPolicy: "no-cache"}
  )

  const tasks = data?.tasks || [];
  const user = AuthService.loggedIn();

  // setting up useEffect that will be passed down as props to be used in other components 
  useEffect(() => {
    // when we rerender get tasks again 
    getAllTasks()
    // reset state back to false 
    setShouldUpdate(false)
  }, [getAllTasks, shouldUpdate])

  if (loading) {
    return <div>Loading...</div>;
  }

  // Question: why isn't this seeing that I'm logged in?
  if (!user || undefined) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <Container maxWidth="lg">
        <h1>Viewing Your Pod's Taskboard.</h1>
        <br/>
        { loading ? (
          <div>Loading your Pod's tasks</div>
        ) : (
          <TaskList setShouldUpdate={setShouldUpdate} tasks={tasks} username={`${user.username}'s tasks...`}/>
        )}
          <br/>
        <TaskForm setShouldUpdate={setShouldUpdate}/>
      </Container>
    </div> 
  );
};

export default Taskboard;
