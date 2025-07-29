import React, { useState } from 'react'
import { Button, Dropdown } from "@vibe/core";

function SelectColumns({ columns, fromDefaultColumn, onSubmit }) {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const onClick = () => {
        if (!from || !to) {
            console.log("Please select both 'From' and 'To' columns.");
            return;
        }
        if (from === to) {
            console.log("The 'From' and 'To' columns cannot be the same.");
            return;
        }
        onSubmit(from, to);

        // Reset the selections after the operation
        setFrom("");
        setTo("");
    }

    return (
        <div>
            <div className="menu-container">
                <Dropdown
                    options={columns} 
                    placeholder="From"
                    className="dropdown-stories-styles_with-chips"
                    onInputChange={(from) => setFrom(from)}
                />
                <Dropdown
                    options={columns}
                    placeholder="To" 
                    className="dropdown-stories-styles_with-chips" 
                    onInputChange={(to) => setTo(to)} 
                />
            </div>
            <Button onClick={onClick}>Make Copy</Button>
        </div>

    )
}

export default SelectColumns