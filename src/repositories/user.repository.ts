import { dbQuery, dbQueryFirst } from "../services/db";
import { User } from "../models/users";

const insertUser = async (user: User) => {
    try{
        await dbQuery(`INSERT INTO user (nome, sobrenome, np, senha, senhaConfirm) VALUES(?,?,?,?,?)`, [user.nome, user.sobrenome, user.np, user.senha, user.senhaConfirm]);
        let retorno = await dbQuery(`SELECT seq AS id FROM sqlite_sequence WHERE name = 'user'`);
        return getUsersById(retorno[0].id);
    }
    catch(err){
        throw(err)
    }
};

const updateUser = async (id: Number, user: User) => {
    try{
        await getUsersById(id);
        if(id){
            await dbQuery(`UPDATE user SET nome = ?, sobrenome = ?, np = ?, senha = ?, senhaConfirm = ? WHERE id = ?`, [user.nome, user.sobrenome, user.np, user.senha, user.senhaConfirm, id]);
        }
    }
    catch(err){
        throw(err)
    }
};

const listUsers = async (): Promise<User[]> => {
    try{
        const retorno = await dbQuery(`SELECT * FROM user`);
        return retorno as User[];
    }
    catch(err){
        throw(err)
    }
};

const getUsersById = async (id: Number)  => {
    try{
        const retorno = await dbQueryFirst(`SELECT * FROM user WHERE id = ?`, [id]);
        return retorno as User | undefined;
    }
    catch(err){
        throw(err);
    } 
};

const deleteUser = async (id: Number)  => {
    try{
        return await dbQuery(`DELETE FROM user WHERE id = ?`, [id]); 
    }
    catch(err){
        throw(err)
    }
    
}

export const userRepository = {
    insertUser,
    listUsers,
    getUsersById,
    deleteUser,
    updateUser
}