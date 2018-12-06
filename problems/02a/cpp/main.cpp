#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

std::vector<std::string> readInput(std::string);
int solve(std::vector<std::string>);

int main() {
    std::string FILE_LOCATION = "..\\input.txt";
    std::vector<std::string> input = readInput(FILE_LOCATION);

    int solution = solve(input);
    std::cout << solution << std::endl;
    std::cin.get();

    return 0;
}

int solve(std::vector<std::string> lines) {
    int twos = 0;
    int threes = 0;
    for(int i = 0; i < lines.size(); i++) {
        bool two = false;
        bool three = false;
        std::string box = lines[i];
        int currentCount = 0;
        char currentChar;
        std::sort(box.begin(), box.end());
        for(int j = 0; j < box.length() && !(two && three); j++) {
            char boxChar = box[j];
            if(boxChar != currentChar) {
                currentChar = boxChar;
                if(currentCount == 2) two = true;
                if(currentCount == 3) three = true;
                currentCount = 0;
            }
            currentCount++;
        }
        if(currentCount == 2) two = true;
        if(currentCount == 3) three = true;
        if(two) twos++;
        if(three) threes++;
    }

    return twos * threes;
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
