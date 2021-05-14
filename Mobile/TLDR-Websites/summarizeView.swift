//
//  summarizeView.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/12/21.
//

import UIKit
import Alamofire
import SCLAlertView
class summarizeView: UIViewController {
    @IBOutlet weak var choiceControl: UISegmentedControl!
    
    @IBOutlet weak var sumText: UITextField!
    @IBAction func summarizeHit(_ sender: Any) {
        let requestUrl: URL = URL(string: "http://tldr-server.us-east-2.elasticbeanstalk.com/user")!

        
        
        if(choiceControl.selectedSegmentIndex == 0){
            
            let parameters: [String: String?] = [
                "url" : sumText.text,
            ]


            AF.request( "http://tldr-server.us-east-2.elasticbeanstalk.com/summarize",
                       method: .post,
                       parameters: parameters , encoder:JSONParameterEncoder.default).responseJSON { response in
                        debugPrint(response)
                        SCLAlertView().showInfo("Congratulations", subTitle: "Your summary has been saved")


                    }
        }
        else{
            let parameters: [String: String?] = [
                "plaintext" : sumText.text,
            ]


            AF.request( "http://tldr-server.us-east-2.elasticbeanstalk.com/summarize",
                       method: .post,
                       parameters: parameters , encoder:JSONParameterEncoder.default).responseJSON { response in
                        debugPrint(response)
                        SCLAlertView().showInfo("Congratulations", subTitle: "Your summary has been saved")
                    }
            
            
        }

    
    


    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print(HTTPCookieStorage.cookies)
       
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


