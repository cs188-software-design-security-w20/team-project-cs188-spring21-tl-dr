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

        
      
        if(GIDSignIn.sharedInstance()?.currentUser != nil)
        {
            GIDSignIn.sharedInstance().restorePreviousSignIn()

            struct data: Codable{
                let clientType: String
                let id_token: String
                
            }
            
            struct urlPar: Codable{
                let url: String
            }
            let param = data(clientType: "ios", id_token: GIDSignIn.sharedInstance().currentUser.authentication.idToken)
            print("Good!")
            AF.request( "https://tldr-server.paramshah.net/login",
                       method: .post,
                       parameters: param , encoder:JSONParameterEncoder.default).response { response in
                        print(response)
                        if let headerFields = response.response?.allHeaderFields as? [String: String], let URL = response.request?.url
                                {
                                     let cookies = HTTPCookie.cookies(withResponseHeaderFields: headerFields, for: URL)
                                        
                                     print(cookies)
                            
                                }
                       }
            
        
            
            
            self.performSegue(withIdentifier: "signedInAlready", sender: self)
        }
        else
        {
        print("not!")
        }
    }
    }



