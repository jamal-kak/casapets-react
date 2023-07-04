export const map_Clients_veterinaires_pets_reservations = (reservations,Clients,pets,veterinaires) =>
{
    // console.log(reservations);
    // console.log(Clients);
    // console.log(pets);
    // console.log(veterinaires);
    let maped_reservations = null;

    if(reservations){

        maped_reservations = reservations?.data.map(elem => {
            
    
            const client = Clients?.data.filter(client => client.id === elem.client_id)[0];
            const pet = pets?.data.filter(pet => pet.id === elem.pet_id)[0];
            const vet = veterinaires?.data.filter(vet => vet.id === elem.veterinaire_id)[0];
    
            return {
                ...elem,
                "client_full_name":client?.full_name,
                "pet_name":pet?.name,
                "vet_full_name":vet?.full_name,
                client,
                pet,
                vet
    
            }
        })

    }



    // console.log(maped_reservations);
    return maped_reservations;
}


export function formatDate(datePickerObj) {
    if (!datePickerObj) {
      return ""; // Return an empty string or handle the case when datePickerObj is null or undefined
    }
  
    const day = datePickerObj.$D?.toString().padStart(2, "0");
    const month = (datePickerObj.$M + 1)?.toString().padStart(2, "0");
    const year = datePickerObj.$y?.toString();
  
    if (day && month && year) {
      return `${year}-${month}-${day}`;
    } else {
      return ""; // Handle the case when any of the properties are undefined or null
    }
  }