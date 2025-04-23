import { UserService } from "./UserService"
import { UserServiceInter } from "./UserServiceInter"
import { UserServiceStub } from "./UserServiceStub"

class UserServiceManager {
    private static instance: UserServiceInter
    private static useStub = true
  
    public static getInstance(): UserServiceInter {
      if (!UserServiceManager.instance) {
        UserServiceManager.instance = this.useStub
          ? new UserServiceStub()
          : new UserService()
      }
      return UserServiceManager.instance
    }
  }
  
export default UserServiceManager