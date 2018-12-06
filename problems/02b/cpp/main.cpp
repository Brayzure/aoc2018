#include <fstream>
#include <iostream>
#include <string>
#include <vector>

std::vector<std::string> readInput(std::string);
std::string solve(std::vector<std::string>);
bool compare(std::string, std::string);
std::string stripDifferences(std::string, std::string);

int main() {
    std::string FILE_LOCATION = "..\\input.txt";
    std::vector<std::string> input = readInput(FILE_LOCATION);

    std::string solution = solve(input);
    std::cout << solution << std::endl;
    std::cin.get();

    return 0;
}

std::string solve(std::vector<std::string> lines) {
    for(int i = 0; i < lines.size() - 1; i++) {
        for(int j = i + 1; j < lines.size(); j++) {
            if(compare(lines[i], lines[j])) {
                return stripDifferences(lines[i], lines[j]);
            }
        }
    }
}

bool compare(std::string str1, std::string str2) {
    int differences = 0;
    for(int i = 0; i < str1.length() && differences < 2; i++) {
        if(str1[i] != str2[i]) differences++;
    }
    if(differences == 1) return true;
    return false;
}

std::string stripDifferences(std::string str1, std::string str2) {
    std::string similarities = "";
    for(int i = 0; i < str1.length(); i++) {
        if(str1[i] == str2[i]) similarities += str1[i];
    }
    return similarities;
}

std::vector<std::string> readInput(std::string fileLocation) {
    std::ifstream in;
    std::string input;
    std::vector<std::string> lines;

    in.open(fileLocation);

    while(std::getline(in, input)) {
        if(input != "") {
            lines.push_back(input);
        }
    }

    in.close();

    return lines;
}
