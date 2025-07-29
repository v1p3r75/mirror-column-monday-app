const columnsKey = "actions";

const saveColumnMappingClient = (from, to) => {
    
    const newMapping = {from, to}; 
    const actions = JSON.parse(localStorage.getItem(columnsKey)) || [];

   if (actions.length > 0) {
        const oldMapping = actions.filter(action => action.from.value === from.value && action.to.value === to.value)
        console.log(from.value, to.value, actions, oldMapping);

        if (oldMapping.length <= 0) {
            
            localStorage.setItem(columnsKey, JSON.stringify([...actions, newMapping]));
        }
        
        return;
    }
    
    localStorage.setItem(columnsKey, JSON.stringify([newMapping]))
}

const saveColumnMapping = (url, from, to) => {

    const data = {
        from : { value: from.value, label: from.label, type: from.type},
        to  : { value: to.value, label: to.label, type: to.type }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return false;
        }
        return true;
    })
    .catch(error => {
        console.error("Error saving column mapping:", error);
        return false;
    });
}

export { saveColumnMapping }