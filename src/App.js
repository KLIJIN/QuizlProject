import React from "react";
import Layout from "./hoc/Loyout/Layout"
import Quiz from "./containers/Quiz/Quiz.js"
import {Route, Switch} from "react-router-dom";

import QuizList from "./containers/QuizList/QuizList"
import QuizCreator from "./containers/QuizCreator/QuizCreator"
import Auth from "./containers/Auth/Auth" 


function App() {
  return (
    <div>
      <Layout>

        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/quiz-creator" exact component={QuizCreator} />
          <Route path="/quiz/:id" exact component={Quiz} />  
          <Route path="/" exact component={QuizList} />
          {/* <Quiz/> */}
         </Switch>
         <Route path="/quiz/" exact component={Quiz} />  

      </Layout>
    </div>
  );
}

export default App;
