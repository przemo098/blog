import React from 'react';

export interface IWithdrawResultComponentProps{
 result: IWithdrawResult;   
}

export interface IWithdrawResult{
    [Key: string]: number;
}

function WithdrawResultComponent(props: IWithdrawResultComponentProps) {
  const keys = Object.keys(props.result);
  const result = keys.map((x) => {
    return <p>Withdrawn notes with nominal {x}: {props.result[x]}</p>
  });
  
  return <div className='withdrawResult'>{
    result
  }</div>;
}

export default WithdrawResultComponent;