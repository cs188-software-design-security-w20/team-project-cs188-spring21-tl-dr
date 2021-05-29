//
//  userProfiles.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/14/21.
//

import UIKit
import GoogleSignIn
import RNCryptor
class userProfiles: UIViewController {

    @IBAction func signOut(_ sender: Any) {
        GIDSignIn.sharedInstance().signOut()
        performSegue(withIdentifier: "logOut", sender: self)
        UserDefaults.resetStandardUserDefaults()

    }
    @IBOutlet weak var numSummaries: UILabel!
    @IBOutlet weak var profilePic: UIImageView!
    
    @IBOutlet weak var Name: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        let defaults = UserDefaults.standard
        
        let dataEncrypted =  defaults.object(forKey: "userData") as? Data
        let decryptedData = try? RNCryptor.decrypt(data: dataEncrypted!, withPassword: "sahen")
         let savedPerson = decryptedData
            let decoder = JSONDecoder()
        if let loadedPerson = try? decoder.decode(User.self, from: savedPerson!) {
                Name.text = loadedPerson.fullName
                profilePic.load(url: loadedPerson.picture)
                let defaults = UserDefaults.standard
                if(defaults.integer(forKey: "sumCount") != nil){
                    numSummaries.text = String(defaults.integer(forKey: "sumCount")) + " summaries saved"
                    
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

}
extension UIImageView {
    func load(url: URL) {
        DispatchQueue.global().async { [weak self] in
            if let data = try? Data(contentsOf: url) {
                if let image = UIImage(data: data) {
                    DispatchQueue.main.async {
                        self?.image = image
                    }
                }
            }
        }
    }
}
