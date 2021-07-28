


function getContacts(request, response){
    const {name, email} = request.query;
    console.log(name);
    console.log(email);


    return response.status(200).json({message: "getContacts"});
}

function createContact(request, response){
    const {firstName, lastName, email, telephones} = request.body;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(telephones);


    return response.status(200).json({message: "createContact"});
}


function removeContact(request, response){
    const {id} = request.params;

    console.log(id);
    return response.status(200).json({message: "removido"});
}

function updateContact(request, response){
    const {id} = request.params;
    const {firstName, lastName, email, telephones} = request.body;

    console.log(id);
    console.log(request.body);
    return response.status(200).json({message: "removido"});
}

export {getContacts, createContact, removeContact};