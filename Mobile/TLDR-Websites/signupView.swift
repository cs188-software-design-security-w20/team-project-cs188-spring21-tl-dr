//
//  signupView.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/10/21.
//

import UIKit
import GoogleSignIn
import NVActivityIndicatorView
import SCLAlertView
class signupView: UIViewController {

    @IBOutlet weak var imageNotDone: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
        GIDSignIn.sharedInstance()?.presentingViewController = self
        imageNotDone.isHidden = false
        let timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(fireTimer), userInfo: nil, repeats: true)

    }
    @objc func fireTimer() {
        if(GIDSignIn.sharedInstance()?.currentUser != nil){
            imageNotDone.isHidden = true
            imageDone.isHidden = false
        }
    }

    @IBAction func continueButton(_ sender: Any) {
        if(GIDSignIn.sharedInstance()?.currentUser != nil){
           performSegue(withIdentifier: "signedUp", sender: self)
            
        }
        else
        {
            SCLAlertView().showWarning("Error", subTitle: "You must be signed in to continue")
            
        }
        
    }
    
    @IBOutlet weak var imageDone: UIImageView!
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
