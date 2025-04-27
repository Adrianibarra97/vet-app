import { PetOwnerService } from "./PetOwnerService"
import { UserServiceInter } from "./UserServiceInter"
import { UserServiceStub } from "./UserServiceStub"
import { VetService } from "./VetService"

type UserType = "vet" | "petOwner"


class UserServiceManager  {
    private static useStub = true
    private static userType: UserType = "vet"
  
    public static getInstance(): UserServiceInter {
      if (this.useStub) {
        return new UserServiceStub()
      } else {
        if (this.userType === "vet") {
          return new VetService()
        } else {
          return new PetOwnerService()
        }
      }
    }
    public static setUserType(type: UserType) {
      this.userType = type
    }
    public static getUserType(): UserType {
      return this.userType
    }
    
  }
  
export default UserServiceManager