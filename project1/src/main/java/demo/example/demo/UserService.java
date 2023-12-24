package demo.example.demo;
import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	public UserService(){
		LoadFromDisk();
		System.out.println("Servidor iniciado");
	}
	private final Map<String,Usuario> registers = new HashMap<>();
	private final String fileName = "UserData.txt";
	private class Usuario{
		String username;
		String password;

		int record;
		public String toString(){
			return ("User: " + username + "; Password: " + password + "; Record: " + record);
		}
		public Usuario(String name, String pass, int recordIn){
			password = pass;
			username = name;
			record = recordIn;
		}

	}
	
	public  ResponseEntity authenticateLogin(String username, String password) {
		
        if(!this.registers.containsKey(username))
        {
        	return ResponseEntity.ok("Usuario no encontrado");
        }
        if(this.registers.get(username).password.equals(password))
        {
        	return ResponseEntity.ok("Login exitoso");
        }else {

        	return ResponseEntity.ok("Contraseña incorrecta");
        }
    }
	public ResponseEntity authenticateRegister(String username, String password)
	{
	  if(!registers.containsKey(username))	
        {
        	addRegisters(username, password);      	
        	return ResponseEntity.ok("Registro exitoso");
        }      	
       return ResponseEntity.ok("Usuario ya registrado");
		
	}
	public Map<String,Usuario> getRegisters()
	{
		return this.registers;
	}

	public boolean checkPassword(String username, String password){
		return registers.get(username).password.equals(password);
	}

	public void updatePassword(String username, String password){
		//if(!registers.containsKey(username)) return;
		Usuario updatedUser = registers.get(username);
		updatedUser.password = password;
		registers.replace(username, updatedUser);
	}

	public void delete(String username){
		var a = registers.remove(username);
	}

	public void SaveToFile(){
		try {
			FileWriter myWriter = new FileWriter(fileName);
			for(var user : registers.values()) {
                myWriter.write(user.toString() + '\n');
            }
			myWriter.close();
			System.out.println("Successfully wrote to the file.");
		} catch (IOException e) {
			System.out.println("An error occurred.");
			e.printStackTrace();
		}
	}

	public void UpdatePassword(String username,String password){
		String oldFileName = fileName;
		String tmpFileName = "tmp_" + fileName;

		BufferedReader br = null;
		BufferedWriter bw = null;
		try {
			br = new BufferedReader(new FileReader(oldFileName));
			bw = new BufferedWriter(new FileWriter(tmpFileName));
			String line;
			while ((line = br.readLine()) != null) {
				var aux = line.split(";");
				var name = aux[0].split(": ");
				if(name[1].equals(username)) {
					break;
				}

				bw.write(line+"\n");
			}
		} catch (Exception e) {
			return;
		} finally {
			try {
				if(br != null)
					br.close();
			} catch (IOException e) {
				//
			}
			try {
				if(bw != null)
					bw.close();
			} catch (IOException e) {
				//
			}
		}
		// Once everything is complete, delete old file..
		File oldFile = new File(oldFileName);
		oldFile.delete();

		// And rename tmp file's name to old file name
		File newFile = new File(tmpFileName);
		newFile.renameTo(oldFile);

	}


	public void addRegisters(String username,String password) 
	{
		this.registers.put(username, new Usuario(username,password,0));
		SaveToFile();
	}
	 private void LoadFromDisk(){
		 try {
			 File myObj = new File(fileName);
			 Scanner myReader = new Scanner(myObj);
			 while (myReader.hasNextLine()) {
				 String data = myReader.nextLine();
				 var aux = data.split("; ");
				 Usuario user = new Usuario(aux[0].split(": ")[1], aux[1].split(": ")[1], Integer.parseInt(aux[2].split(": ")[1]));
				 registers.put(user.username, user);
			 }
			 myReader.close();
		 } catch (FileNotFoundException e) {
			 System.out.println("An error occurred.");
			 e.printStackTrace();
		 }
	 }
}
