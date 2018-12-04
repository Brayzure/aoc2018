#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>

int parseInput(std::string);

int main() {
    std::string FILE_LOCATION = "..\\input.txt";
    int STARTING_FREQUENCY = 0;

    std::ifstream in;
    std::string input;
    std::vector<int> offsets;
    int value;
    int frequency = STARTING_FREQUENCY;
    int currentIndex = 0;
    std::unordered_set<int> visitedValues;

    in.open(FILE_LOCATION);
    while(std::getline(in, input)) {
        if(input != "") {
            value = parseInput(input);
            offsets.push_back(value);
        }
    }
    in.close();

    while(!visitedValues.count(frequency)) {
        visitedValues.insert(frequency);
        frequency += offsets[currentIndex];
        currentIndex = (currentIndex + 1) % offsets.size();
    }

    std::cout << frequency << std::endl;

    std::cin.get();
    return 0;
}

int parseInput(std::string value) {
    std::string absoluteValue = value.substr(1);
    int modifier = 1;
    if(value[0] == '-') {
        modifier = -1;
    }
    int parsedValue = std::stoi(absoluteValue) * modifier;
    return parsedValue;
}