import React from 'react'
import CoursePart from '../types';

interface PartsTypes {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: PartsTypes) => {
    switch (part.type) {
        case "normal":
            return <p><b>{part.name} {part.exerciseCount}</b><br />
                <i>{part.description}</i></p>
            break;
        case "submission":
            return <p><b>{part.name} {part.exerciseCount}</b><br />
                <i>{part.description}</i><br />
                submit to {part.exerciseSubmissionLink}</p>
            break;
        case "groupProject":
            return <p><b>{part.name} {part.exerciseCount}</b><br />
                project exercises {part.groupProjectCount}</p>
            break;
        case "special":
            return <p><b>{part.name} {part.exerciseCount}</b><br />
                required skills: {part.requirements.join(', ')}
            </p>
            break;
        default:
            return assertNever(part);
            break;
    }
}

export default Part