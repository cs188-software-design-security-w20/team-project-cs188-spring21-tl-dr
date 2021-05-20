//
//  summarizeView.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/12/21.
//

import UIKit
import Alamofire
import SCLAlertView
import NVActivityIndicatorView
import GoogleSignIn
class summarizeView: UIViewController {
    @IBOutlet weak var choiceControl: UISegmentedControl!
    @IBOutlet weak var privPub: UISegmentedControl!
    
    @IBOutlet weak var buttonReference: UIButton!
    @IBOutlet weak var stack: UIStackView!
    @IBOutlet weak var animationPlay: NVActivityIndicatorView!
    @IBOutlet weak var sumText: UITextField!
    @IBAction func summarizeHit(_ sender: Any) {
        animationPlay.startAnimating()
        animationPlay.isHidden = false
        
        sumText.isHidden = true
        buttonReference.isHidden = true
        choiceControl.isHidden = true
        stack.isHidden = true
        let requestUrl: URL = URL(string: "http://tldr-server.us-east-2.elasticbeanstalk.com/user")!

        
        
        if(choiceControl.selectedSegmentIndex == 0){
            
            let parameters: [String: String?] = [
                "url" : sumText.text,
                "isPublic": (privPub.selectedSegmentIndex == 0) ? "false" : "true"

            ]


            AF.request( "http://tldr-server.us-east-2.elasticbeanstalk.com/summarize",
                       method: .post,
                       parameters: parameters , encoder:JSONParameterEncoder.default).responseJSON { response in
                        debugPrint(response)
                        SCLAlertView().showInfo("Congratulations", subTitle: "Your summary has been saved")
                        self.sumText.isHidden = false
                        self.stack.isHidden = false
                        self.buttonReference.isHidden = false
                        self.choiceControl.isHidden = false
                        self.animationPlay.isHidden = true

                    }
            
            
        }
        else{
            let parameters: [String: String?] = [
                "plaintext" : sumText.text,
                "isPublic": (privPub.selectedSegmentIndex == 0) ? "false" : "true"
            ]


            AF.request( "http://tldr-server.us-east-2.elasticbeanstalk.com/summarize",
                       method: .post,
                       parameters: parameters , encoder:JSONParameterEncoder.default).responseJSON { response in
                        debugPrint(response)
                        SCLAlertView().showInfo("Congratulations", subTitle: "Your summary has been saved")
                        self.sumText.isHidden = false
                        self.buttonReference.isHidden = false
                        self.choiceControl.isHidden = false
                        self.stack.isHidden = false
                        self.animationPlay.isHidden = true
                    }
         
            
        }

    
    


    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        struct data: Codable{
            let clientType: String
            let id_token: String
            
        }
        
        struct urlPar: Codable{
            let url: String
        }
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
        
    }
        
    }
    

    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */


