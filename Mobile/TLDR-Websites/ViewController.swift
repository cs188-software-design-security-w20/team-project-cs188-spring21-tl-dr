//
//  ViewController.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 4/21/21.
//

import UIKit
import GoogleSignIn
import Alamofire
import LocalAuthentication
import RNCryptor
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
      
        
        
        
        var context = LAContext()
        context.localizedCancelTitle = "Enter Username/Password"
        var error: NSError?
        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {

    }
        
        let reason = "Log in to your account"
        context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason ) { success, error in

            if success {


                DispatchQueue.main.async { [unowned self] in
                }

            } else {
                print(error?.localizedDescription ?? "Failed to authenticate")
            }
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        let decoder =  JSONDecoder()
        
      
        let defaults = UserDefaults.standard
      
             
                    //            let param = data(clientType: "ios", id_token: GIDSignIn.sharedInstance().currentUser.authentication.idToken)

                   
                    
                    if(GIDSignIn.sharedInstance()?.currentUser != nil)
                    {
                        
                        let decoder = JSONDecoder()
                        let defaults = UserDefaults.standard
                        AF.request( "https://tldr-server.paramshah.net/csrf-token",
                                   method: .get).responseJSON { response in
                                    print(response)
                                   
                                    do{
                                        let tokenData = try decoder.decode(Token.self, from: response.data!)
                                        print(tokenData.csrfToken)
                                        print("Got here!")
                                        
                                        GIDSignIn.sharedInstance().restorePreviousSignIn()

                                        struct data: Codable{
                                            let clientType: String
                                            let id_token: String
                                            
                                        }
                                        
                                        struct urlPar: Codable{
                                            let url: String
                                        }

                                        let param: [String: String?] = [
                                            "clientType" : "ios",
                                            "id_token":GIDSignIn.sharedInstance().currentUser.authentication.idToken

                                        ]
                                        

                                        let headers: HTTPHeaders = [
                                            "X-CSRF-Token": tokenData.csrfToken,
                                        ]
                                        
                                        AF.request( "https://tldr-server.paramshah.net/login",
                                                   method: .post,
                                                   parameters: param ,encoder:JSONParameterEncoder.default, headers: headers).responseJSON { response in
                                                    print("sahen")
                                                    print(response.debugDescription)
                                                    if let headerFields = response.response?.allHeaderFields as? [String: String], let URL = response.request?.url
                                                            {

                                                                 let cookies = HTTPCookie.cookies(withResponseHeaderFields: headerFields, for: URL)
                                                                print("cooks!")
                                                                 print(cookies)

                                                            }
                                                    self.performSegue(withIdentifier: "signedInAlready", sender: self)
                                                 

                                                   }
                                                    
                                        defaults.set(tokenData.csrfToken, forKey: "tokendata")
                                       }
                                    catch let error {
                                                
                                    }
                                    
                                   }

                        
                       
                        
                        
                    }
                    else
                    {
                    print("not!")
                    }
                   }
      
  
    }
    



