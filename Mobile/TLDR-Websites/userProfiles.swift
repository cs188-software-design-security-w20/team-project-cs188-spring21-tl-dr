//
//  userProfiles.swift
//  TLDR-Websites
//
//  Created by Sahen Rai on 5/14/21.
//

import UIKit

class userProfiles: UIViewController {

    @IBOutlet weak var profilePic: UIImageView!
    
    @IBOutlet weak var Name: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        let defaults = UserDefaults.standard
        if let savedPerson = defaults.object(forKey: "userData") as? Data {
            let decoder = JSONDecoder()
            if let loadedPerson = try? decoder.decode(User.self, from: savedPerson) {
                Name.text = loadedPerson.fullName
                profilePic.load(url: loadedPerson.picture)
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
