import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: {props.price.toFixed(2)}</p>
        {controls.map(control => (
            <BuildControl 
            key={control.label} 
            label={control.label}
            added={() => props.ingredientAdded(control.type)}
            deleted={() => props.ingredientDeleted(control.type)}
            disabled={props.disabled[control.type]} />
        ))}
        <button 
        className={classes.OrderButton}
        disabled={props.purchasable}
        onClick={props.ordered}>Order now</button>
    </div>
)

export default buildControls;