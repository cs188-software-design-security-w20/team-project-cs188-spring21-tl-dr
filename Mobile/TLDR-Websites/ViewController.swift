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

                // Move to the main thread because a state update triggers UI changes.
                DispatchQueue.main.async { [unowned self] in
                }

            } else {
                print(error?.localizedDescription ?? "Failed to authenticate")

                // Fall back to a asking for username and password.
                // ...
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
            let paramUrl = urlPar(url: "http://en.wikipedia.org/wiki/Die_Hard")
            let param = data(clientType: "ios", id_token: GIDSignIn.sharedInstance().currentUser.authentication.idToken)
            print("Good!")
            AF.request( "http://tldr-server.us-east-2.elasticbeanstalk.com/login",
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



