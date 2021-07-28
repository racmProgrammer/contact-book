import { v4 as uuidV4 } from "uuid";
import { Contact } from "modules/entities/Contact";
import { getConnection, getRepository } from "typeorm";
import { AppError } from "errors/AppError";

async function getContacts(request, response){
    const {name, email} = request.query;

    try {
        const contactList = await getRepository(Contact)
        .createQueryBuilder("contact")
        .where("(contact.firstName like :name or contact.lastName like :name) and contact.email like :email", {
            name: `%${name ? name : ''}%`,
            email:`%${email ? email : ''}%`   
        })
        .getMany();

        const list = contactList.map((contact) =>{
            return {...contact, telephones:contact.telephones.split('|')}
        });
        return response.status(200).json(list);
    }catch (error) {
        throw new AppError( "Error on returning contact.",500);
    }    
}

async function createContact(request, response){
    const {firstName, lastName, email, telephones} = request.body;
   
    if(telephones){
        try {
            const returned =  await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values([
                { 
                id: uuidV4(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                telephones: telephones.join('|') 
                }
                
            ])
            .execute();

            const contact = await getRepository(Contact)
            .createQueryBuilder("contact")
            .where("contact.id = :id", {
                id: returned.identifiers[0].id
            })
            .getOne();
            
            return response.status(201).json({
                ...contact,
                message: "The contact was created."});
        } catch (error) {
            
            console.log(error);
            return response.status(400).json({message: "Error on creating contact."});
        }
    }else{
        return response.status(400).json({message: "You must add a telephone number in the form."});
    }   
}

async function removeContact(request, response){
    const {id} = request.params;

    try {
        const contact = await getRepository(Contact)
            .createQueryBuilder("contact")
            .where("contact.id = :id", {
                id: id  
            })
            .getOne();
        if(contact){
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Contact)
                .where("id = :id", { id: id })
                .execute();
        }else{
            return response.status(404).json({message: `The contact is not found.`});
        }
        return response.status(201).json({message: `The contact ${contact.firstName} was removed.`});

    }catch (error) {
        return response.status(400).json({
            message: `Error while removing contact.`,
            detail: error.message 
        });
    }
}

async function updateContact(request, response){
    const {id, firstName, lastName, email, telephones} = request.body;

    try {
        const contact = await getRepository(Contact)
            .createQueryBuilder("contact")
            .where("contact.id = :id", {
                id: id  
            })
            .getOne();

        if(contact){
            await getConnection()
            .createQueryBuilder()
            .update(Contact)
            .set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                telephones: telephones.join('|')
            })
            .where("id = :id", { id: id })
            .execute();
        }else{
            return response.status(404).json({message: `The contact is not found.`});
        }
        return response.status(201).json({message: `The contact was updated.`});
    } catch (error) {
        return response.status(400).json({
            message: `Error on updating contact.`,
            detail: error.message
        });
    }
}

export {getContacts, createContact, removeContact, updateContact};