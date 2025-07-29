import React, { useState } from 'react'
import { Button, Dropdown, AlertBanner, AlertBannerText } from "@vibe/core";

function SelectColumns({ columns, defaultFromColumn, onSubmit }) {

    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});
    const [error, setError] = useState(null);
    console.log("defaultFromColumn", defaultFromColumn);
    
    const onClick = () => {

        if (!from.value || !to.value) {
            setError("Please select both 'From' and 'To' columns.");
            return;
        }
        if (from.value === to.value) {
            setError("The 'From' and 'To' columns cannot be the same.");
            return;
        }
        if (from.type !== to.type) {
            setError("The 'From' and 'To' columns must be of the same type.");
            return;
        }
    
        onSubmit(from, to);
        setError(null);
;
    }

    return (
        <div>
            {
                error &&
                <AlertBanner onClose={function Zs() { }} backgroundColor='negative'>
                    <AlertBannerText text={error} />
                </AlertBanner>
            }
            <div className="menu-container">
                <Dropdown
                    options={columns}
                    placeholder="From"
                    className="dropdown-stories-styles_with-chips"
                    onChange={from => setFrom(from)}
                />
                <Dropdown
                    options={columns}
                    placeholder="To"
                    className="dropdown-stories-styles_with-chips"
                    onChange={to => setTo(to)}
                />
            </div>
            <Button onClick={onClick}>Make Copy</Button>
        </div>

    )
}

export default SelectColumns