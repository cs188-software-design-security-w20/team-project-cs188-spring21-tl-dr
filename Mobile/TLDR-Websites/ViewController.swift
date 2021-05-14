//
//  ViewController.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 4/21/21.
//

import UIKit
import GoogleSignIn
import Alamofire
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
       
    }
    
    override func viewDidAppear(_ animated: Bool) {

        
      
        if(GIDSignIn.sharedInstance()?.currentUser != nil)
        {
            struct data: Codable{
                let clientType: String
                let id_token: String
                
            }
            
            struct urlPar: Codable{
                let url: String
            }
            let paramUrl = urlPar(url: "https://en.wikipedia.org/wiki/Die_Hard")
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



