import { gql } from "@apollo/client";

export const companyInfoQuery = `
  query ExampleQuery {
    company {
      name
      ceo
      founder
      founded
      headquarters {
        city
        state
      }
      summary
      employees
      valuation
      launch_sites
    }
  }
`;

export const spaceShipsQuery = `
 query ExampleQuery {
    ships {
      image
      name
      roles
      active
      home_port
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation CreateQuestion($questionInput: QuestionInput) {
    createQuestion(questionInput: $questionInput) {
      name
      description
      createdAt
    }
  }
`;

export const GET_QUESTIONS = gql`
  query GetQuestions($amount: Int) {
    getQuestions(amount: $amount) {
      name
      description
      createdAt
      _id
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(ID: $id)
  }
`;

export const EDIT_QUESTION = gql`
  mutation EditQuestion($id: ID!, $questionInput: QuestionInput) {
    editQuestion(ID: $id, questionInput: $questionInput)
  }
`;
