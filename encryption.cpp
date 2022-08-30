#include<iostream>
#include<string>
using namespace std;
string encrypt(const string& s);
int main(){
    string test = "First time to go to Lovorm, does not feel anything special! I know my Monalisa is always there for me...";
    string encrypted = encrypt(test);
    cout<<"encrypted:"<<encrypted<<endl;
    string decrypted = encrypt(encrypted);
    cout<<"decrypted:"<<decrypted<<endl;
}

string encrypt(const string& s){
    string result = "";
    char encryptedChar;
    for(char c:s){
        if(isalpha(c)){
            if(islower(c)){
                encryptedChar = 25 - (c - 'a') + 'a';
            }
            else{
                encryptedChar = 25 - (c - 'A') + 'A';
            }
        }
        else{
            encryptedChar = c;
        }
        result += encryptedChar;
    }
    return result;
}
