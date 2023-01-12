import AppDataSource from "../../data-source"
import { Doctors } from "../../entities/doctors/doctors.entity"

const deleteDoctorService = async (product_id:string) => {

    const productRepo = AppDataSource.getRepository(Doctors)
    const product = await productRepo.findOneBy({id:product_id})
    
    await productRepo.save(product)
    return {}
}

export default deleteDoctorService