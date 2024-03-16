import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ChatIcon from "@material-ui/icons/Chat";
import PersonIcon from "@material-ui/icons/Person";
import { QUERY_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const MessageList = () => {
  const { data } = useQuery(QUERY_MESSAGES);

  const messages = data?.messages || [];

  if (!messages.length) {
    return <h3>Start the conversation</h3>;
  }

  return (
    <div>
      {messages &&
        messages.map((message) => (
          <div key={message._id} className="">
            {/* <Grid direction="column" container spacing={1} original-of-below-grid> */}
            <Grid  >
              {/* <Grid container item sm={12} original-of-below-grid > */}
              <Grid >
                <span className="nameStyle">{message.username}:</span> <span className="chatStyle">{message.messageText}</span>
              </Grid>
              {/* <Grid container item sm={12} original-of-below-grid > */}
              <Grid container item sm={6}>
                <Link
                  to={`/profile/${message.username}`}
                  style={{ fontWeight: 700 }}
                  className="text-light"
                >
                  <PersonIcon />
                </Link>{" "}
                <Link to={`/message/${message._id}`}>
                  <ChatIcon />
                </Link>
                <div className="messageDate">{message.createdAt}</div>
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default MessageList;

