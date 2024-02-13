import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS } from '../utils/queries';
import Container from '@material-ui/core/Container';
import AuthService from '../utils/auth';

const Taskboard = () => {
 
  const{ loading, data} = useQuery(
    QUERY_TASKS
  )
 
  const tasks = data?.tasks || [];
  const user = AuthService.loggedIn();

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <TaskList  tasks={tasks} username={`${user.username}'s tasks...`}/>
        )}
          <br/>
        <TaskForm />
      </Container>
    </div> 
  );
};

export default Taskboard;
